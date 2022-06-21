export const rules = {
  required: (message: string = "Поле обязательно для заполнения") => ({
    required: true,
    message,
  }),
};
