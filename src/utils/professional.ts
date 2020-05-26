import Professional from "../models/Professional";

const exists = async (email: string) => Professional.exists({ email });

export { exists };
