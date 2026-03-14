import { FormBase, type FormControlProps } from "@/components/form/form-base";
import { useFieldContext } from "@/components/form/form-hooks";
import { Checkbox } from "@/components/ui/checkbox";

export function FormCheckbox(props: FormControlProps) {
	const field = useFieldContext<boolean>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<FormBase {...props} controlFirst horizontal>
			<Checkbox
				aria-invalid={isInvalid}
				checked={field.state.value}
				id={field.name}
				name={field.name}
				onBlur={field.handleBlur}
				onCheckedChange={(e) => field.handleChange(e === true)}
			/>
		</FormBase>
	);
}
