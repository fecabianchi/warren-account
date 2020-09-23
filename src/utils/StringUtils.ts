export default class StringUtils {
  public static toLowerCase(text: string) {
    return text.toLowerCase();
  }

  public static ucFirstLetter(text: string) {
    const textAsLowerCase = this.toLowerCase(text);
    return `${textAsLowerCase.charAt(0).toUpperCase()}${textAsLowerCase.slice(1)}`;
  }
}
