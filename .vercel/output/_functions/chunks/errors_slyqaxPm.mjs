import { Data } from 'effect';

class StudioCMSAPIError extends Data.TaggedError("StudioCMSAPIError") {
}

export { StudioCMSAPIError as S };
