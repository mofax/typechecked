export class TypeCheckedError extends TypeError {
	data?: Record<string, string>;
	name = "TypeCheckedError";
	constructor(message: string) {
		super(message);
	}
}
