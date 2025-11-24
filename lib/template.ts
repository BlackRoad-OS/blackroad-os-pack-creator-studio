import Handlebars from 'handlebars';

export const renderTemplate = <T extends object>(source: string, context: T): string => {
  const template = Handlebars.compile(source, { noEscape: true });
  return template(context);
};
