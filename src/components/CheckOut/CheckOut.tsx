"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { checkoutSessionAction } from "@/Actions/Cart/cart.action";
import { useRef } from "react";

export default function CheckOut({ cartId }: { cartId: string }) {
    const city = useRef<HTMLInputElement>(null);
    const phone =useRef<HTMLInputElement>(null);
    const details = useRef<HTMLInputElement>(null);
  async function handleCheckout() {
    const result = await checkoutSessionAction(cartId, {
      city: city.current?.value ?? "",
      details: details.current?.value ?? "",
      phone: phone.current?.value ?? "",
    });
    if (result.status === "success") {
      window.location.href = result.session.url;
    }
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="py-4">Proceed to Checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Shipping Address</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="city-1">City</Label>
              <Input id="city-1" name="city" defaultValue="Cairo" ref={city} />
            </Field>
            <Field>
              <Label htmlFor="details-1">Details</Label>
              <Input id="details-1" name="details" defaultValue="Maddi" ref={details} />
            </Field>
            <Field>
              <Label htmlFor="phone-1">Phone</Label>
              <Input id="phone-1" name="phone" defaultValue="01158766984" ref={phone} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleCheckout}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
