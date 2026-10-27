// "use client";

// import { AlertDialog, Button } from "@heroui/react";

// export function BookingDelete({ bookingId }) {
//   const { destinationName, _id } = destination;
//   return (
//     <AlertDialog>
//       <Button variant="accent" className="text-l">
//         Cancel
//       </Button>
//       <AlertDialog.Backdrop>
//         <AlertDialog.Container>
//           <AlertDialog.Dialog className="sm:max-w-[400px]">
//             <AlertDialog.CloseTrigger />
//             <AlertDialog.Header>
//               <AlertDialog.Icon status="danger" />
//               <AlertDialog.Heading>
//                 Are you sure you want to cancel this booking?
//               </AlertDialog.Heading>
//             </AlertDialog.Header>
//             <AlertDialog.Body>
//               <p>
//                 This will permanently delete <strong>{destinationName}</strong>{" "}
//                 and all of its data. This action cannot be undone unless you
//                 book again.
//               </p>
//             </AlertDialog.Body>
//             <AlertDialog.Footer>
//               <Button slot="close" variant="tertiary">
//                 Cancel
//               </Button>
//               <Button slot="close">Cancel Booking</Button>
//             </AlertDialog.Footer>
//           </AlertDialog.Dialog>
//         </AlertDialog.Container>
//       </AlertDialog.Backdrop>
//     </AlertDialog>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialog, Button, toast } from "@heroui/react";

import { authClient } from "@/lib/auth-client";

export function BookingDelete({ bookingId, destinationName }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleCancelBooking = async () => {
    setIsPending(true);

    const { data: tokenData } = await authClient.token();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      toast.success("Booking cancelled", {
        description: `${destinationName} was removed from your bookings.`,
      });
      router.refresh();
    } catch (err) {
      console.error("Cancel booking error:", err);
      toast.danger("Couldn't cancel booking", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AlertDialog>
      <Button
        variant="accent"
        className="w-full  text-sm font-semibold text-red-600 hover:border-red-300 hover:bg-red-50 sm:w-auto sm:py-2.5"
      >
        Cancel Booking
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Are you sure you want to cancel this booking?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will cancel your booking for{" "}
                <strong>{destinationName}</strong>. This action can&apos;t be
                undone, but you can book the trip again later.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Keep booking
              </Button>
              <Button
                slot="close"
                variant="danger"
                isPending={isPending}
                onPress={handleCancelBooking}
              >
                Cancel booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
