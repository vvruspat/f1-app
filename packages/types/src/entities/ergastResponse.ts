export type ErgastResponse<T> = {
	MRData: {
		xmlns: string;
		series: "f1";
		url: string;
		limit: number;
		offset: number;
		total: number;
	} & T;
};
