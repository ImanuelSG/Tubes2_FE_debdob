import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
  FormLabel,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import Image from "next/image";
import { APIResponse, Response } from "@/lib/types";
import generateDAGData from "@/lib/generateDAGData";

interface MainFormProps {
  setResult: Dispatch<SetStateAction<Response | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setShowPaper: Dispatch<SetStateAction<boolean>>;
  setPaths: Dispatch<SetStateAction<string[][]>>;
}

const initialResponse: Response = {
  nodes: [],
  edges: [],
  levelNum: {},
  timeTaken: 0,
  resultNum: 0,
  resultDepth: 0,
  resultVisited: 0,
};

const WIKIPEDIA_SEARCH_ENDPOINT =
  "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*";

const MainForm: React.FC<MainFormProps> = ({
  setResult,
  setLoading,
  setShowPaper,
  setPaths,
}) => {
  const { toast } = useToast();
  const [query, setQuery] = useState<string>("");
  const [wikipediaSuggestions, setWikipediaSuggestions] = useState([]);
  const [suggestionType, setSuggestionType] = useState<
    "source" | "destination" | null
  >(null);

  const fetchWikipediaSuggestions = async (query: string) => {
    if (query) {
      const response = await fetch(
        `${WIKIPEDIA_SEARCH_ENDPOINT}&search=${query}`
      );
      const data = await response.json();
      setWikipediaSuggestions(data[1].slice(0, 5)); // data[1] contains the list of suggestions, take the first 5 entries
    } else {
      setWikipediaSuggestions([]);
    }
  };

  const doesWikipediaArticleExist = async (title: string) => {
    const wikipediaCheckApiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=redirects&format=json&origin=*`;

    try {
      const response = await fetch(wikipediaCheckApiUrl);
      const data = await response.json();

      // Check if the response contains the requested page and it doesn't redirect
      return (
        data.query &&
        data.query.pages &&
        Object.keys(data.query.pages)[0] !== "-1"
      );
    } catch (error) {
      console.log("Error checking Wikipedia article:", error);
      return false;
    }
  };

  const formSchema = z.object({
    method: z.string().min(1, { message: "Method cannot be empty" }),
    source: z.string().min(1, { message: "Source cannot be empty" }),
    destination: z.string().min(1, {
      message: "Destination cannot be empty",
    }),
    type: z.string().min(1, { message: "Result Type cannot be empty" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      method: "BFS",
      source: "",
      destination: "",
      type: "Single",
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = form;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "source" | "destination"
  ) => {
    const newValue = event.target.value;
    setSuggestionType(type);
    setQuery(newValue);
    setValue(type, newValue); // update the form value as well
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestionType) {
      setValue(suggestionType, suggestion); // update the form field value
      setQuery(""); // reset query to hide suggestions
      setSuggestionType(null); // hide suggestions after selecting
    }
  };

  useEffect(() => {
    fetchWikipediaSuggestions(query);
  }, [query]);

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    setResult(null);
    const isSourceValid = await doesWikipediaArticleExist(formData.source);
    const isDestinationValid = await doesWikipediaArticleExist(
      formData.destination
    );

    if (!isSourceValid || !isDestinationValid) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with your request. One of your input is not a wikipedia article",
      });
      return;
    }

    formData.source = formData.source.replace(/ /g, "_");

    formData.destination = formData.destination.replace(/ /g, "_");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}?src=${formData.source}&dest=${formData.destination}&search=${formData.method}&resultAmount=${formData.type}`
      );

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
        setLoading(false);
        return;
      } else {
        const data: APIResponse = await response.json();
        let Result: Response = { ...initialResponse };

        // Generate the DAG data and fill the Result object
        const { nodes, Edges, numNodeLevel } = generateDAGData(data.paths);

        Result.edges = Edges;
        Result.nodes = nodes;
        Result.levelNum = numNodeLevel;
        Result.timeTaken = data.timeTaken;
        Result.resultNum = data.paths.length;
        Result.resultDepth = data.paths[0].length - 1;
        Result.resultVisited = data.visited;

        setResult(Result);
        setPaths(data.paths);
        setLoading(false);
        toast({
          variant: "success",
          title: "Success!",
          description:
            "Your request has been submitted. with the value of " +
            formData.source +
            " and " +
            formData.destination +
            " and method " +
            formData.method +
            ".",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your network.",
      });
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 space-y-8">
        <h1 className="text-xl font-semibold text-center">
          Find the shortest paths from
        </h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row justify-center gap-10">
            <FormField
              key={2}
              control={control}
              name="source"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormLabel>Source</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="source"
                      {...field}
                      value={field.value} // required to bind the value from the form
                      onChange={(e) => handleInputChange(e, "source")}
                      onBlur={() => {
                        setTimeout(() => setSuggestionType(null), 1000);
                      }}
                      onFocus={(e) => {
                        setSuggestionType("source");
                        setQuery(field.value);
                      }}
                    />
                  </FormControl>
                  {suggestionType === "source" &&
                    wikipediaSuggestions.length > 0 && (
                      <div className="absolute  shadow-xl w-full">
                        {wikipediaSuggestions.map((suggestion, index) => (
                          <div
                            className="border bg-color3 border-black p-2 hover:bg-gray-100 cursor-pointer"
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col w-1/6 items-center gap-2">
              <p>To</p>
              <Button
                type="button"
                className="bg-transparent hover:bg-transparent"
                onClick={() => {
                  // Ambil nilai source dan destination dari form
                  const sourceValue = form.getValues("source");
                  const destinationValue = form.getValues("destination");

                  // Tukar nilai source dan destination
                  form.setValue("source", destinationValue);
                  form.setValue("destination", sourceValue);

                  // Ganti nilai display
                  setQuery(destinationValue);
                  setSuggestionType("source");
                }}
              >
                <Image
                  src="/revert.png"
                  alt="arrow"
                  width={25}
                  height={25}
                  className="hover:opacity-70"
                />
              </Button>
            </div>
            <FormField
              key={3}
              control={control}
              name="destination"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="destination"
                      {...field}
                      value={field.value}
                      onChange={(e) => handleInputChange(e, "destination")}
                      onBlur={() => {
                        setTimeout(() => setSuggestionType(null), 1000);
                      }}
                      onFocus={(e) => {
                        setSuggestionType("destination");
                        setQuery(field.value);
                      }}
                    />
                  </FormControl>
                  {suggestionType === "destination" &&
                    wikipediaSuggestions.length > 0 && (
                      <div className="absolute  shadow-xl w-full">
                        {wikipediaSuggestions.map((suggestion, index) => (
                          <div
                            className="border bg-color3 border-black p-2 hover:bg-gray-100 cursor-pointer"
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <section className="flex flex-col items-center justify-center gap-5">
          <FormField
            key={1}
            control={control}
            name="method"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Method</FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue="BFS"
                    onValueChange={(newValue: any) => field.onChange(newValue)}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="BFS" />
                      </FormControl>
                      <FormLabel className="font-normal">BFS</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="IDS" />
                      </FormControl>
                      <FormLabel className="font-normal">IDS</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key={2}
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3 items-center justify-center">
                <h1 className="text-center">Result type</h1>
                <FormControl>
                  <RadioGroup
                    defaultValue="Single"
                    onValueChange={(newValue: any) => field.onChange(newValue)}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Single" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Single Solution
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Multi" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Multiple Solution
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <div className="flex justify-center">
          <Button
            type="submit"
            onClick={() => {
              setLoading(true), setShowPaper(true);
            }}
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MainForm;
