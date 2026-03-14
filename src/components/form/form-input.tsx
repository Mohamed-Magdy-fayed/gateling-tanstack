import { Input } from "../ui/input";
import { FormBase, type FormControlProps } from "./form-base";
import { useFieldContext } from "./form-hooks";

export function FormInput(props: FormControlProps) {
	const field = useFieldContext<string>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<FormBase {...props}>
			<Input
				aria-invalid={isInvalid}
				id={field.name}
				name={field.name}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				value={field.state.value}
			/>
		</FormBase>
	);
}
