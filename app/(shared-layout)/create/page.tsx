"use client";
import { createBlogAction } from "@/app/actions";
import { blogSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function CreateRoute() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const mutateSomething = useMutation(api.posts.createPost);

  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: { title: "", content: "" },
  });
  function onSubmit(data: z.infer<typeof blogSchema>) {
    startTransition(async () => {
      // mutateSomething({ body: data.content, title: data.title });
      // await createBlogAction();
      await fetch("/api/create-blog", {
        method: "POST",
      });
      toast.add({
        type: "success",
        description: "Successfully created post",
      });
      router.push("/");
    });
  }
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Create Post
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Share your thoughts with community
        </p>
      </div>
      <Card className="max-w-xl w-full mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>Create a new blog article</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-4">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter article title"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]}></FieldError>
                    )}
                  </Field>
                )}
              />
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter article content"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]}></FieldError>
                    )}
                  </Field>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin size-5" />
                  </>
                ) : (
                  <span>Create Post</span>
                )}
              </Button>{" "}
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
