"use client";
import { useEffect, useState } from "react";
import { set, z } from "zod";
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

const WIKIPEDIA_SEARCH_ENDPOINT =
  "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*";

const MainForm = () => {
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
      console.log(data);

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
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      method: "BFS",
      source: "",
      destination: "",
    },
  });

  const { control, handleSubmit, setValue } = form;

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
    const isSourceValid = await doesWikipediaArticleExist(formData.source);
    const isDestinationValid = await doesWikipediaArticleExist(
      formData.destination
    );

    if (!isSourceValid || !isDestinationValid) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}?src=${formData.source}&dest=${formData.destination}&search=${formData.method}`
      );

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
        return;
      } else {
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
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your network.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-5">
          <FormField
            key={1}
            control={control}
            name="method"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    defaultValue="BFS"
                    onValueChange={(newValue) => field.onChange(newValue)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="BFS" id="r1" />
                      <Label htmlFor="r1">BFS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="IDS" id="r2" />
                      <Label htmlFor="r2">IDS</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row gap-10 ">
            <FormField
              key={2}
              control={control}
              name="source"
              render={({ field }) => (
                <FormItem>
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
                      <div className="shadow-xl">
                        {wikipediaSuggestions.map((suggestion, index) => (
                          <div
                            className="border  border-black p-2 hover:bg-gray-100 cursor-pointer"
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
            <p>To</p>
            <FormField
              key={3}
              control={control}
              name="destination"
              render={({ field }) => (
                <FormItem>
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
                      <div className="shadow-xl">
                        {wikipediaSuggestions.map((suggestion, index) => (
                          <div
                            className="border  border-black p-2 hover:bg-gray-100 cursor-pointer"
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default MainForm;
