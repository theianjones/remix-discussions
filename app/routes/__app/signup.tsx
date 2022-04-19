import {ActionFunction, Form, json, LinksFunction, useActionData, useLoaderData, useTransition} from 'remix'
import {redirect} from 'remix'
import { ZodError } from 'zod'
import {userSignup, USER_LOGIN} from '~/services/auth.server'
import { db } from '~/services/db.server'
import {Signup} from '~/services/validations'
import styles from '~/styles/signup.css'

export const links: LinksFunction = () => {
  return [
    {rel: 'stylesheet',
      href: styles}
  ]
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    email: string | undefined;
    password: string | undefined;
  };
  fields?: {
    email: string;
    password: string;
  };
};

const badRequest = (data: ActionData) =>
  json(data, { status: 400 });

export const action: ActionFunction = async ({request}) => {
  const form = await request.formData()
  const rawEmail = form.get('email')
  const rawPassword = form.get('password')


  if (
    typeof rawEmail !== "string" ||
    typeof rawPassword !== "string" 
    ) {
      return badRequest({
        formError: `Form not submitted correctly.`,
      });
    }
    
    
  const fields = { email: rawEmail, password: rawPassword}
  
  const result = Signup.safeParse({
    email: rawEmail,
    password: rawPassword,
  })

  if(!result.success){
    const errors = result.error.format()
    
    return badRequest({fields, fieldErrors: {email: errors.email?._errors[0], password: errors.password?._errors[0]}})
  }


    
    const userExists = await db.user.findFirst({
      where: { email: rawEmail },
    })
  
    
  if(userExists) {
    return badRequest({fields, formError: `User with ${rawEmail} already exists`,})
  }
 
  const user = await userSignup(result.data.email, result.data.password)
  if (user) {
    return redirect('/login')
  } else {
    return {}
  }
  
}

export default function SignupPage() {
  const data = useActionData<ActionData>()
  console.log(data)
  const transition = useTransition()
  return (
    <div className='signup'>
      <h1>Sign up</h1>
      <Form method="post" className='form'>
        <div className='field'>

        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
        {data?.fieldErrors?.email && <p className='error'>{data.fieldErrors.email}</p>}
        </div>
        <div className='field'>

        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        {data?.fieldErrors?.password && <p className='error'>{data.fieldErrors.password}</p>}
        </div>
        
        <button type="submit" className="button">
        {transition.state === 'idle' ? 'Create Account' : 'Creating Account....'}
        </button>
        {data?.formError && <p className='error'>{data.formError}</p>}
      </Form>
    </div>
  )
}
