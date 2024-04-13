export const cpf = (value: string) =>
  value.match(
    /([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/g,
  );

export const phoneNumber = (value: string) => value.match(/\([1-9]{2}\) (9([0-9]{4})-([0-9]{4}))/g);
