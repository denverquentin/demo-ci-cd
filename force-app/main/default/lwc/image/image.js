import { LightningElement, api } from 'lwc';

export default class Image extends LightningElement {
	@api url; // Required Absolute Url for the image.
	@api width; // Optional Width attribute for the image.
	@api height; // Optional Height attribute for the image.
	@api alt; // Optional Alt text to display for the image.
	@api imgClass; // Optional Class name to apply to the image tag.

	get isUrlSet() {
		return (!this.url || this.url == null) ? false : true;
	}

//	badCodeHere() {
//		this.alt = 'hello';
//	}

}
