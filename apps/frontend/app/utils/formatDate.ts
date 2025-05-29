export const formatDate = (date: string, locale = "en-GB") => {
	const d = new Date(date);
	const options: Intl.DateTimeFormatOptions = {
		day: "2-digit",
		month: "short",
		year: "numeric",
	};
	return d.toLocaleDateString(locale, options).replace(/ /g, " ");
};
