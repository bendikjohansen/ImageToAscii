using System.Text;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;

namespace Core;

public interface IImageToAsciiConverter
{
    string Convert(Image<Rgba32> image);
}

public class ImageToAsciiConverter : IImageToAsciiConverter
{
    private readonly IPixelToAsciiConverter _pixelConverter;

    public ImageToAsciiConverter(IPixelToAsciiConverter pixelConverter)
    {
        _pixelConverter = pixelConverter;
    }

    public string Convert(Image<Rgba32> image)
    {
        var asciiBuilder = new StringBuilder(image.Width * image.Height);
        ForEachPixel(image, (pixel, newLine) =>
        {
            if (pixel == null && !newLine)
            {
                throw new MissingPixelException();
            }
            
            if (pixel?.R is {} pixelStrength)
            {
                var asciiCharacter = _pixelConverter.Convert(pixelStrength);
                asciiBuilder.Append(asciiCharacter);
            }
            else
            {
                asciiBuilder.AppendLine();
            }
        });

        return asciiBuilder.ToString();
    }
    
    private static void ForEachPixel(Image<Rgba32> image, Action<Rgba32?, bool> callback)
    {
        for (var y = 0; y < image.Height; y++)
        {
            var row = image.GetPixelRowSpan(y);
            foreach (var pixel in row)
            {
                callback(pixel, false);
            }
            callback(null, true);
        }
    }
}

public class MissingPixelException : Exception
{
}