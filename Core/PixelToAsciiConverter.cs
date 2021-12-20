namespace Core;

public interface IPixelToAsciiConverter
{
    char Convert(int pixelStrength);
}

public class PixelToAsciiConverter : IPixelToAsciiConverter
{
    private static readonly char[] AsciiCharset = { '@', '#', '*', '^', '¨', ',', '.', ' ' };

    public char Convert(int pixelStrength)
    {
        if (pixelStrength is < 0 or > 255) throw new PixelStrengthOutOfBoundsException(pixelStrength);
        return AsciiCharset[pixelStrength / 32];
    }
}

public class PixelStrengthOutOfBoundsException : Exception
{
    private static string ErrorMessage(int strength) => $"Pixel strength must be within 0 and 255, but was: {strength}";

    public PixelStrengthOutOfBoundsException(int pixelStrength) : base(ErrorMessage(pixelStrength))
    {
    }
}