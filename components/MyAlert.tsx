import { AppProps } from "next/dist/shared/lib/router/router"


export default function MyAlert({ content, contentBold, v}: {content: any, contentBold: any, v: any}) {

  if (content === undefined) return <></>

  if (v === "alert") return (
    <div className="bg-calertbg border border-calertborder text-calert mt-5 px-3 py-3 rounded relative" role="alert">
      {contentBold != undefined ? <p><strong className="font-bold">{contentBold}</strong></p> : ""}
      <p className="block sm:inline">{content}</p>
    </div>
  )

  if (v === "success") return (
    <div className="bg-calertbgsuccess border border-calertbordersuccess text-calertsuccess mt-5 px-3 py-3 rounded relative" role="alert">
      {contentBold != undefined ? <p><strong className="font-bold">{contentBold}</strong></p> : ""}
      <p className="block sm:inline">{content}</p>
    </div>
  )

  if (v === "warning") return (
    <div className="bg-calertbgwarning border border-calertborderwarning text-calertwarning mt-5 px-3 py-3 rounded relative" role="alert">
      {contentBold != undefined ? <p><strong className="font-bold">{contentBold}</strong></p> : ""}
      <p className="block sm:inline">{content}</p>
    </div>
  )

  return <></>


}
