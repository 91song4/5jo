import * as Joi from 'joi';

const emptyMessage = '빈 값이 들어있읍니다.';

export const signupValidation = Joi.object({
  userId: Joi.string()
    .alphanum()
    .min(3)
    .max(10)
    .required()
    .message(emptyMessage),

  password: Joi.string()
    .pattern(new RegExp('^[a-z0-9]{3,30}$', 'ig'))
    .required()
    .message(emptyMessage),

  passwordCheck: Joi.ref('password'),

  name: Joi.string().max(10).required().message(emptyMessage),

  phone: Joi.string().required().message(emptyMessage),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required()
    .message(emptyMessage),

  birthday: Joi.date().required().message(emptyMessage),
});
