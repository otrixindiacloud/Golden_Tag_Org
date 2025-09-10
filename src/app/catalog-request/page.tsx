"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

	const CatalogOptions = [
		"Corporate Gifts",
		"Electronics",
		"Apparel",
		"Wellness",
		"Office Supplies",
		"Eco‑friendly",
		"Tech Accessories",
		"Drinkware",
		"Bags",
		"Stationery",
		"Wellness & Fitness",
		"Custom Apparel",
		"Awards & Recognition",
		"Travel",
		"Home & Lifestyle",
		// Added broader e‑commerce categories
		"Home & Kitchen",
		"Toys & Games",
		"Sports & Outdoors",
		"Beauty & Personal Care",
		"Books",
		"Automotive",
		"Baby",
		"Pet Supplies",
		"Gaming",
		"Furniture",
		"Jewelry",
		"Health & Household",
		"Grocery & Gourmet Food",
		"Tools & Home Improvement",
	] as const;

const CatalogRequestSchema = z.object({
	catalog: z.string().trim().min(1, "Select a catalog"),
	product: z.string().trim().min(1, "Product is required"),
	quantity: z
		.string()
		.trim()
		.min(1, "Quantity is required")
		.regex(/^\d+$/, "Quantity must be a number"),
	email: z
		.string()
		.trim()
		.min(1, "Email is required")
		.email("Enter a valid email"),
	phone: z
		.string()
		.trim()
		.min(6, "Phone is required")
		.max(20, "Phone seems too long"),
});

type CatalogRequestValues = z.infer<typeof CatalogRequestSchema>;

export default function CatalogRequestPage() {
	const { toast } = useToast();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<CatalogRequestValues>({
		resolver: zodResolver(CatalogRequestSchema),
		defaultValues: { catalog: "", product: "", quantity: "1", email: "", phone: "" },
	});

	async function onSubmit(values: CatalogRequestValues) {
		setIsSubmitting(true);
		try {
			const res = await fetch("/api/catalog-request", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data?.error || "Request failed");
			toast({ title: "Request sent", description: "We have sent details to your email." });
			form.reset();
		} catch (err: any) {
			toast({ variant: "destructive", title: "Failed to send", description: err.message || "Please try again." });
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="mx-auto max-w-xl px-4 py-10">
			<h1 className="mb-6 text-2xl font-semibold">Catalog Request</h1>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-5"
			>
				<div className="space-y-2">
					<Label htmlFor="catalog">Select Product Catalog</Label>
					<select
						id="catalog"
						className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
						{...form.register("catalog")}
					>
						<option value="">Choose a catalog</option>
						{CatalogOptions.map((opt) => (
							<option key={opt} value={opt}>{opt}</option>
						))}
					</select>
					{form.formState.errors.catalog && (
						<p className="text-sm text-red-600">{form.formState.errors.catalog.message}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="product">Product</Label>
					<Input
						id="product"
						placeholder="e.g., Wireless Power Bank"
						{...form.register("product")}
					/>
					{form.formState.errors.product && (
						<p className="text-sm text-red-600">{form.formState.errors.product.message}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="quantity">Quantity</Label>
					<Input id="quantity" type="number" min={1} {...form.register("quantity")} />
					{form.formState.errors.quantity && (
						<p className="text-sm text-red-600">{form.formState.errors.quantity.message}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="email" placeholder="you@example.com" {...form.register("email")} />
					{form.formState.errors.email && (
						<p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="phone">Phone Number</Label>
					<Input id="phone" type="tel" placeholder="e.g., +919876543210" {...form.register("phone")} />
					{form.formState.errors.phone && (
						<p className="text-sm text-red-600">{form.formState.errors.phone.message}</p>
					)}
				</div>

				<Button type="submit" disabled={isSubmitting} className="w-full">
					{isSubmitting ? "Sending..." : "Send me details"}
				</Button>
			</form>
		</div>
	);
}


