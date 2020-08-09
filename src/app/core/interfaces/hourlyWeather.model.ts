
export interface Main {
	temp: number;
}

export interface List {
	dt: number;
	main: Main;
}

export interface HourlyWeather {
	list: List[];
}

