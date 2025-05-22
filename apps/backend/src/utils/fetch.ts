// Make request with response type
// This is not a universal method, because it is used only for two GET requests
export const $fetch = async <T>(url: string): Promise<T> => {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return response.json() as Promise<T>;
};
