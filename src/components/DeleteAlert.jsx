// "use client";

// import { authClient } from "@/lib/auth-client";
// import { AlertDialog, Button } from "@heroui/react";
// import { redirect, useRouter } from "next/navigation";
// import { IoTrashBin } from "react-icons/io5";

// export function DeleteAlert({ destination }) {
//   const { destinationName, _id } = destination;

//   const router = useRouter();

//   const handleDelete = async () => {
//     const { data: tokenData } = await authClient.token();
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/destinations/${_id}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${tokenData?.token}`,
//         },
//       },
//     );

//     const data = await res.json();
//     router.refresh();
//     redirect("/destinations");
//   };

//   return (
//     <AlertDialog>
//       <Button
//         variant="danger"
//         className={"text-[12px] sm:text-[12px] rounded-xl hover:bg-accent"}
//         size="sm"
//       >
//         <IoTrashBin />
//         Delete Destination
//       </Button>
//       <AlertDialog.Backdrop>
//         <AlertDialog.Container>
//           <AlertDialog.Dialog className="sm:max-w-[400px]">
//             <AlertDialog.CloseTrigger />
//             <AlertDialog.Header>
//               <AlertDialog.Icon status="danger" />
//               <AlertDialog.Heading>
//                 Delete destination permanently?
//               </AlertDialog.Heading>
//             </AlertDialog.Header>
//             <AlertDialog.Body>
//               <p>
//                 This will permanently delete <strong>{destinationName}</strong>{" "}
//                 and all of its data. This action cannot be undone.
//               </p>
//             </AlertDialog.Body>
//             <AlertDialog.Footer>
//               <Button slot="close" variant="tertiary">
//                 Cancel
//               </Button>
//               <Button onClick={handleDelete} slot="close" variant="danger">
//                 Delete
//               </Button>
//             </AlertDialog.Footer>
//           </AlertDialog.Dialog>
//         </AlertDialog.Container>
//       </AlertDialog.Backdrop>
//     </AlertDialog>
//   );
// }

"use client";

import { useState } from "react"; // Added useState
import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button, Input } from "@heroui/react"; // Added Input
import { useRouter } from "next/navigation";
import { IoTrashBin } from "react-icons/io5";

export function DeleteAlert({ destination }) {
  const { destinationName, _id } = destination;
  const router = useRouter();

  // 1. Create state to hold the password the admin types
  const [adminPass, setAdminPass] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    // Validation: Don't even call the server if the password field is empty
    if (!adminPass) {
      alert("Please enter the admin password to proceed.");
      return;
    }

    setIsPending(true);
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/destinations/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          // 2. Send the password stored in the state
          body: JSON.stringify({ adminPassword: adminPass }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || `Server responded with ${res.status}`,
        );
      }

      // 3. Use router.push instead of redirect
      router.refresh();
      router.push("/destinations");
    } catch (err) {
      alert(err.message || "Something went wrong while deleting.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AlertDialog>
      <Button
        variant="danger"
        className={"text-[12px] sm:text-[12px] rounded-xl hover:bg-accent"}
        size="sm"
      >
        <IoTrashBin />
        Delete Destination
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete destination permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p className="mb-4">
                This will permanently delete <strong>{destinationName}</strong>{" "}
                and all of its data. This action cannot be undone.
              </p>

              {/* 4. ADDED: Password input field */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-500">
                  Admin Password Required
                </label>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  variant="flat"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                slot="close"
                variant="danger"
                isLoading={isPending} // Show loading spinner
              >
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
