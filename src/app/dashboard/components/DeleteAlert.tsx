"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import React, { useState, useTransition } from "react";
import { TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteBlogById } from "@/lib/actions/blog";
import { toast } from "@/components/ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const DeleteAlert = ({ blogId }: { blogId: string }) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await deleteBlogById(blogId);
      const { error } = JSON.parse(result);

      if (error?.message) {
        toast({
          title: "Fail to delete blog",
          description: (
            <pre>
              <code>{error.message}</code>
            </pre>
          ),
        });
      } else {
        // revalidatePath("/dashboard");
        toast({
          title: "Successfully deleted",
        });
      }
    });
    return;
  };

  return (
    // open, onOpenChange를 이용해서 다이얼로그를 키고끈다.
    // 이렇게 하는 이유는, form을 전송하고 나서도 다이얼로그가 계속 켜져있는 문제를 해결하기 위함.
    // (켜져있는 모달에서 continue를 클릭하면 계속 삭제된다. 밑에 남아있는게 없을때까지
    // 모달이 계속 켜져있음.)
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger className={buttonVariants({ variant: "outline" })}>
        {/* <Button variant="outline" className="flex items-center gap-2">
          <TrashIcon />
          Delete
        </Button> */}
        <TrashIcon />
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction> */}
          {/* <form onSubmit={onSubmit}>
            <Button className="flex items-center gap-2">
              <AiOutlineLoading3Quarters
                className={cn("animate-spin", { hidden: !isPending })}
              />
              Continue
            </Button>
          </form> */}
          {/* <form onSubmit={onSubmit}> */}
          <form
            onSubmit={async (event) => {
              await onSubmit(event);
              setIsOpen(false);
            }}
          >
            <Button className="flex gap-2 items-center">
              <AiOutlineLoading3Quarters
                className={cn(" animate-spin ", {
                  hidden: !isPending,
                })}
              />
              Continue
            </Button>
          </form>
          {/* </AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
