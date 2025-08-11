import ElementEditComponent from "@/components/admin/page-builder/elements/ElementEditComponent"

interface Props {
  params: {
    elementId: string
  }
}

export default function ElementEditPage({ params }: Props) {
  const elementId = Number(params.elementId) // تبدیل رشته به عدد

  return <ElementEditComponent elementId={elementId} />
}
