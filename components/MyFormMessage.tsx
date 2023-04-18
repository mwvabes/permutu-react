import { AppProps } from "next/dist/shared/lib/router/router"


export default function MyFormMessage({ content, v}: {content: any, v: any}) {

  if (content === undefined) return <></>

  if (v === "alert") return (
    <p className="cMessageAlert text-xs">{content}</p>
  )

  if (v === "success") return (
    <p className="cMessageSuccess text-xs">{content}</p>
  )

  if (v === "warning") return (
    <p className="cMessageWarning text-xs">{content}</p>
  )

  return <></>


}
