package expo.modules.imagepicker

import android.content.Intent
import androidx.annotation.FloatRange
import androidx.annotation.IntRange
import expo.modules.kotlin.assertions.assertValueGreaterOrEqual
import expo.modules.kotlin.assertions.assertValueInRange
import expo.modules.kotlin.exception.CodedException
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

internal class ImagePickerOptions: Record {
  @Field
  @FloatRange(from = 0.0, to = 1.0)
  var quality: Double = 0.2
    set(value) {
      assertValueInRange(value, lowerBound = 0.0, upperBound = 1.0)
      field = value
    }

  @Field
  var allowsEditing: Boolean = false

  /**
   * TODO(@bbarthec): undocumented
   */
  @Field
  @IntRange(from = 0)
  var forceAspect: Pair<Int, Int>? = null
    set(value) {
      if (value != null) {
        val (first, second) = value
        assertValueGreaterOrEqual(first, 0)
        assertValueGreaterOrEqual(second, 0)
      }
      field = value
    }

  @Field
  var base64: Boolean = false

  @Field
  var mediaTypes: MediaTypes = MediaTypes.IMAGES

  @Field
  var exif: Boolean = false

  @Field
  @IntRange(from = 0)
  var videoMaxDuration: Int = 0
    set(value) {
      assertValueGreaterOrEqual(value, 0)
      field = value
    }
}

enum class MediaTypes(val value: String) {
  IMAGES("Images"),
  VIDEOS("Videos"),
  ALL("All");

  internal fun toIntent(): Intent {
    return Intent().also {
      when (this) {
        IMAGES -> it.type = "image/*"
        VIDEOS -> it.type = "video/*"
        ALL -> {
          it.type = "*/*"
          it.putExtra(Intent.EXTRA_MIME_TYPES, arrayOf("image/*", "video/*"))
        }
      }

      it.action = Intent.ACTION_GET_CONTENT
    }
  }
}
