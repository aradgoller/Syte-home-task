export type Catalog = {
	_id: string;
	name: string;
	vertical: Vertical;
	primary: boolean;
	locales: string[];
	indexedAt: Date;
};

export enum Vertical {
	fashion = 'fashion',
	home = 'home',
	general = 'general',
}
