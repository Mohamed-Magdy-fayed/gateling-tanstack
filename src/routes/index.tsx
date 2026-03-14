import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import z from "zod";

import { useAppForm } from "@/components/form/form-hooks";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group";
import { SelectItem } from "@/components/ui/select";
import { useTranslation } from "@/features/i18n/use-translation";
import { QueryState } from "@/integrations/trpc/query-state";
import { useTRPC } from "@/integrations/trpc/react";

export const Route = createFileRoute("/")({
	loader: async ({ context }) => {
		await context.queryClient.prefetchQuery(
			context.trpc.todos.list.queryOptions(),
		);
	},
	component: App,
});

const PROJECT_STATUSES = ["draft", "active", "finished"] as const;
const formSchema = z.object({
	name: z.string().min(1),
	status: z.enum(PROJECT_STATUSES),
	description: z.string().transform((v) => v || undefined),
	notifications: z.object({
		email: z.boolean(),
		sms: z.boolean(),
		push: z.boolean(),
	}),
	users: z
		.array(z.object({ email: z.email() }))
		.min(1)
		.max(5),
});
type FormData = z.infer<typeof formSchema>;

function App() {
	const { t } = useTranslation();
	const trpc = useTRPC();
	const router = useRouter();
	const { data, refetch, error, isPending } = useQuery(
		trpc.todos.list.queryOptions(),
	);

	const { mutate: addTodo, isPending: isAddingTodo } = useMutation({
		...trpc.todos.add.mutationOptions(),
		onSuccess: () => {
			refetch();
			form.reset();
		},
	});

	const form = useAppForm({
		defaultValues: {
			name: "",
			description: "",
			users: [{ email: "" }],
			status: "draft",
			notifications: {
				email: false,
				sms: false,
				push: false,
			},
		} satisfies FormData as FormData,
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			addTodo(value);

			form.reset();
			router.invalidate();
			toast.success("Project created successfully!", {
				description: JSON.stringify(value, null, 2),
				className: "whitespace-pre-wrap font-mono",
			});
		},
	});

	return (
		<>
			<section>
				<h1>{t("appName")}</h1>
				<p>{t("greetings", { name: "Mohamed", lastLoginDate: new Date() })}</p>
				<p>{t("inboxMessages", { name: "Mohamed", messages: 5 })}</p>
				<p>{t("hobby", { hobby: "developer" })}</p>
			</section>
			<section>
				<div className="grid place-content-center gap-2">
					<h1>tRPC Todos list</h1>
					<QueryState
						emptyAction={null}
						error={error}
						isEmpty={!data?.length}
						isPending={isPending || isAddingTodo}
						refetch={refetch}
					>
						<ul>
							{data?.map((t) => (
								<li
									className="rounded-lg border border-white/20 bg-white/10 p-3 shadow-md backdrop-blur-sm"
									key={t.id}
								>
									<span className="text-lg text-white">{t.title}</span>
								</li>
							))}
						</ul>
					</QueryState>
				</div>
			</section>
			<section>
				<div>
					<div className="container mx-auto my-6 px-4">
						<form
							onSubmit={(e) => {
								e.preventDefault();
								form.handleSubmit();
							}}
						>
							<FieldSet disabled={isAddingTodo}>
								<FieldGroup>
									<form.AppField name="name">
										{(field) => <field.Input label="Name" />}
									</form.AppField>

									<form.AppField name="status">
										{(field) => (
											<field.Select label="Status">
												{PROJECT_STATUSES.map((status) => (
													<SelectItem key={status} value={status}>
														{status}
													</SelectItem>
												))}
											</field.Select>
										)}
									</form.AppField>

									<form.AppField name="description">
										{(field) => (
											<field.Textarea
												description="Be as detailed as possible"
												label="Description"
											/>
										)}
									</form.AppField>

									<FieldSet>
										<FieldContent>
											<FieldLegend>Notifications</FieldLegend>
											<FieldDescription>
												Select how you would like to receive notifications.
											</FieldDescription>
										</FieldContent>
										<FieldGroup data-slot="checkbox-group">
											<form.AppField name="notifications.email">
												{(field) => <field.Checkbox label="Email" />}
											</form.AppField>
											<form.AppField name="notifications.sms">
												{(field) => <field.Checkbox label="Text" />}
											</form.AppField>
											<form.AppField name="notifications.push">
												{(field) => <field.Checkbox label="In App" />}
											</form.AppField>
										</FieldGroup>
									</FieldSet>

									<FieldSeparator />

									<form.Field mode="array" name="users">
										{(field) => {
											return (
												<FieldSet>
													<div className="flex items-center justify-between gap-2">
														<FieldContent>
															<FieldLegend className="mb-0" variant="label">
																User Email Addresses
															</FieldLegend>
															<FieldDescription>
																Add up to 5 users to this project (including
																yourself).
															</FieldDescription>
															{field.state.meta.errors && (
																<FieldError errors={field.state.meta.errors} />
															)}
														</FieldContent>
														<Button
															onClick={() => field.pushValue({ email: "" })}
															size="sm"
															type="button"
															variant="outline"
														>
															Add User
														</Button>
													</div>
													<FieldGroup>
														{field.state.value.map((_, index) => (
															<form.Field
																key={index}
																name={`users[${index}].email`}
															>
																{(innerField) => {
																	const isInvalid =
																		innerField.state.meta.isTouched &&
																		!innerField.state.meta.isValid;
																	return (
																		<Field
																			data-invalid={isInvalid}
																			orientation="horizontal"
																		>
																			<FieldContent>
																				<InputGroup>
																					<InputGroupInput
																						aria-invalid={isInvalid}
																						aria-label={`User ${index + 1} email`}
																						id={innerField.name}
																						onBlur={innerField.handleBlur}
																						onChange={(e) =>
																							innerField.handleChange(
																								e.target.value,
																							)
																						}
																						type="email"
																						value={innerField.state.value}
																					/>
																					{field.state.value.length > 1 && (
																						<InputGroupAddon align="inline-end">
																							<InputGroupButton
																								aria-label={`Remove User ${index + 1}`}
																								onClick={() =>
																									field.removeValue(index)
																								}
																								size="icon-xs"
																								type="button"
																								variant="ghost"
																							>
																								<XIcon />
																							</InputGroupButton>
																						</InputGroupAddon>
																					)}
																				</InputGroup>
																				{isInvalid && (
																					<FieldError
																						errors={
																							innerField.state.meta.errors
																						}
																					/>
																				)}
																			</FieldContent>
																		</Field>
																	);
																}}
															</form.Field>
														))}
													</FieldGroup>
												</FieldSet>
											);
										}}
									</form.Field>

									<Button type="submit">Create</Button>
								</FieldGroup>
							</FieldSet>
						</form>
					</div>
				</div>
			</section>
		</>
	);
}
