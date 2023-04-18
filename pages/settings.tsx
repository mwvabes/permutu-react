import type { NextLayoutComponentType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import countryCodes from '../public/countryCodes'
import tailwindConfig from '../tailwind.config'
import ReactCountryFlag from "react-country-flag"
import { AppProps } from 'next/dist/shared/lib/router/router'
import SmallLoader from '../components/SmallLoader'
import MyAlert from '../components/MyAlert'
import { useRouter } from 'next/router'
import { getLoggedInThunk } from '../redux/user'
import { useDispatch, useSelector } from 'react-redux'
import axios, { AxiosError } from 'axios'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import MyLoader from '../components/MyLoader'
import MyFormMessage from '../components/MyFormMessage'

const tailwindConfigColors = tailwindConfig.theme.extend.colors
const flagStyle = { width: '1.5em', borderColor: '#606060', borderWidth: '1px' }

interface BasicInfoFormData {
  full_name: string
  country: string
}

const Flag = ({countryCode}: {countryCode: any}) => {
  return (
    <ReactCountryFlag svg style={flagStyle} countryCode={countryCode} />
  )
}


const BasicInfoForm = ({t} : {t:any}) => {

  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ v: null, content: null, contentBold: null })

  const { register, handleSubmit, watch, formState: { errors }, control } = useForm<BasicInfoFormData>({mode: "onChange"})

  const countries = countryCodes.countryCodes.map((c: any) => {
    if (c.code === '*') return {value: '*', label: <>{t.dontSpecify}</>}
    else return {value: c.code, label: <><Flag countryCode={c.code} /> {c.name}</>
  }}
  )

  //const handleSelect = register("country")

  // const handleChange = (v) => {
  //   console.log("VV", v)
  //   //{ type, target, target: { value, name, type: inputType }, }
  //   handleSelect.onChange({"target": {"value": v.value}})
  // }

  const onSubmit = handleSubmit((data) => {
    setLoading(true)
    console.log(data)
    // setLoading(true)
    // let c 
    // if (data.country === undefined) {
    //  c = user.country
    // } else {
    //   c = data.country.value
    // }
      
    // const mydata = {
    //   email: data.email,
    //   password: data.password,
    //   username: data.username,
    //   country: c
    // }

    // console.log(mydata)
    
   
    // setAlert({v: null, content: null, contentBold: null})

    // axios
    // .post(`${process.env.AUTH_API_PUBLIC_ADDRESS}/auth/register`, mydata)
    // .then(response => {
    //   setAlert({v: "success", content: t.registerSuccessful, contentBold: null})
    //   setLoading(false)
    // }).catch((e: AxiosError) => {
    //   console.log( e.response)
    //   if (e.response == undefined) {
    //     setAlert({v: "alert", content: t.connectionError, contentBold: t.tryAgain})
    //   } else if (e.response!.status === 404 && e.response.data["message"] == "Email exists") {
    //     setAlert({v: "alert", content: t.emailExists, contentBold: null})
    //   }  else if (e.response!.status === 404 && e.response.data["message"] == "Username exists") {
    //   setAlert({v: "alert", content: t.usernameExists, contentBold: null})
    //    } else {
    //     setAlert({v: "alert", content: t.connectionError, contentBold: t.tryAgain})
    //   }
    //   setLoading(false)
    // })

  })

  return(
    <>
      <h2 className="text-2xl">{t.basicInfo}</h2>
      <form action="" className="text-left mt-2" onSubmit={onSubmit}>
        <div className="mb-4">
        {errors.full_name && <label htmlFor="full_name" className="text-sm italic text-calertlabel">{t.wrongFullNameFormat}</label>}
          <input
          {...register("full_name", {minLength: 3, maxLength: 50})}
          className="bg-cbrown border border-cborder rounded w-full py-2 px-3 text-gray placeholder-cplaceholder leading-tight focus:outline-none focus:shadow-outline" id="full_name" type="text" placeholder={t.fullName} />
        </div>
        <div className="mb-4">
          <Controller 
          name="country" 
          render={({field}) => (
          <Select className="text-cgray" {...field} styles={{
            input: (base) => ({
              ...base,
              color: tailwindConfigColors.cgray,
            }),
            placeholder: (base) => ({
              ...base,
              color: tailwindConfigColors.cplaceholder,

            }),
            control: (base, state) => ({
              ...base,
              backgroundColor: tailwindConfigColors.cbrown,
              borderColor: state.isFocused ? tailwindConfigColors.cfocusborder : tailwindConfigColors.cborder,
            }),
            indicatorSeparator: (base) => ({
              ...base,
              backgroundColor: tailwindConfigColors.cborder

            }),
            menu: (base) => ({
              ...base,
              backgroundColor: tailwindConfigColors.cbrown,
              borderColor: tailwindConfigColors.cborder,
              color: tailwindConfigColors.cgray,
              "&:hover": {
                backgroundColor: tailwindConfigColors.cbrown,
              },
            }),
            singleValue: (base) => ({
              ...base,
              backgroundColor: tailwindConfigColors.cbrown,
              borderColor: tailwindConfigColors.cborder,
              color: tailwindConfigColors.cgray,
            }),
            option: (base, state) => ({
              ...base,
              "&:hover": {
                backgroundColor: tailwindConfigColors.chr
              },
              backgroundColor: state.isSelected ? tailwindConfigColors.chr : tailwindConfigColors.cbrownl,
              fontWeight: state.isSelected ? "bold" : "inherit"
            }),
          }}
          instanceId="country"
            isSearchable
            noOptionsMessage={(b) => `${t.noOptions}`}
            defaultValue={user.country}
            options={countries} 

          />)}
            control={control}
            />
            </div>
            <div className="mb-4 flex justify-end align-center">
              <MyFormMessage content="123493948 39 829840" v="alert" />
          <button className="transition flex flex-row items-center justify-center bg-primary bg-gradient-to-r from-yellow-600 to-red-600 hover:opacity-80 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline" type="submit">
          
          <MyLoader loading={loading} />{t.saveChanges}
          
          </button>
          </div>
      </form>
    </>
  )

}

const AvatarForm = ({t} : {t:any}) => {

  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ v: null, content: null, contentBold: null })

  return(
    <>
      <h2 className="text-2xl">{t.avatar}</h2>
      
    </>
  )

}

const Privacy = () => {
  return (
    <>
    
    </>
  )
}

const Settings: NextLayoutComponentType = ({t} : {t: any}) => {



  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto">
      <Head>
        <title>Permutu | {t.settings}</title>
      </Head>

      <main className="p-4 mt-2 mb-2 bg-cbrownl">
        <h1 className="m text-4xl font-bold">
          {t.settings}
        </h1>
        <section className="flex flex-row">
          <div className="w-1/3 p-2">
            <div className="flex flex-row">
              
                <AvatarForm t={t} />
              
            </div>
          </div>
        <div className="p-2 border-l-2 border-cborderl">
          <BasicInfoForm t={t} />
        </div>
        <div className="w-1/3">2</div>
        </section>

        <section className="flex flex-row">
          <Privacy />
        </section>

        mwvabes 
        Marcin Wielgos

        
      </main>
    </div>
  )
}

export default Settings
