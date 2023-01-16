export class TypeCheckedError extends TypeError {
	data?: Record<string, string>;
	constructor(message: string) {
		super(message);
	}
}
