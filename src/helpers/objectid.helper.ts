import { Types } from 'mongoose';

export function _toObjectId(id: string) {
	return Types.ObjectId(id);
}

export function _toObjectIds(ids: string[]) {
	return ids.map((val) => Types.ObjectId(val));
}
