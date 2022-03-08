package expo.modules.imagepicker

import expo.modules.kotlin.exception.CodedException

internal class MissingCurrentActivityException : CodedException(message = "Activity which was provided during module initialization is no longer available")

internal class MissingActivityToHandleIntent(intentType: String) : CodedException(message = "Failed to resolve activity to handle the intent of type '$intentType'")

internal class ModuleNotFoundException(moduleName: String): CodedException(message = "Module '$moduleName' not found. Are you sure all modules are linked correctly?")

internal class UserRejectedPermissionsException : CodedException(message = "User rejected permissions")

internal class FailedToCreateFileException: CodedException(message = "Failed to create the media file")

internal class CroppingFailureException: CodedException(message = "Cropping operation failed")

internal class MissingUrlException: CodedException(message = "Missing 'url` property in result data")

internal class FailedDeducingTypeException: CodedException(message = "Can not deduce type of the returned file")

internal class FailedToSaveResultToFileException(cause: Throwable?): CodedException(message = "Can not save result to the file", cause = cause)

internal class FailedToExtractMetadataException(cause: Throwable): CodedException(message = "Can not extract metadata", cause = cause)

internal class UnexpectedException(cause: Throwable): CodedException(message = "Unexpected exception", cause = cause)

internal class ModuleDestroyedException(cause: Throwable): CodedException(message = "Coroutine canceled by module destruction", cause = cause)

internal class FailedToOpenCropToolException(cause: Throwable): CodedException(message = "Can not open the crop tool", cause = cause)