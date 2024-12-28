export interface LandingProps {
		image: string;
		videoId: string;
		video: string;
		ctaText: {
			nb: string;
			fr: string;
		}
		ctaBtnText: {
			nb: string;
			fr: string;
		}
}

export interface PerformanceProps {
	performanceType: {
		nb: string;
		fr: string;
		_type: string;
	};
	description: {
		nb: string;
		fr: string;
		_type: string;
	};
	ctaText: {
		nb: string;
		fr: string;
		_type: string;
	};
	image: {
		asset: string;
	};
}

export interface IntroProps {
	title: {
		nb: string;
		fr: string;
	}
	description: {
		nb: string;
		fr: string;
	}
	imageURLS: [
		{
			alt: string;
			url: string;
		}
	]
}
export interface IntroImage {
	_key: string;
	asset: {
		_ref: string;
	};
	alt: string;
	caption?: string;
}

export interface FeedbackProps {
	title: string;
	feedback: {
		nb: string
		fr: string
	}
	who: string;
	position: {
		nb: string
		fr: string
	}
}

export interface FooterProps {
	instagramURL: string;
	cellNumber: {
		nb: string;
		fr: string;
	};
	email: {
		nb: string;
		fr: string;
	};
	address: {
		nb: string;
		fr: string;
	};
}