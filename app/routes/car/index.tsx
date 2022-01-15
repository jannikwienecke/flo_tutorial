import { Car } from "@prisma/client"
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix"
import { prisma } from "~/entry.server"

type LoaderData = {
  car: Car[]
}

export const loader: LoaderFunction = async ({
  context,
  params,
  request,
}): Promise<LoaderData> => {
  const cars = await prisma?.car.findMany({})

  if (!cars) throw new Error("No cars found")

  return {
    car: cars,
  }
}

export const action: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData()

  const car = formData.get("car") as string

  if (!car) {
    return redirect("/car")
  }

  if (!prisma) throw new Error("prisma is not defined")

  const carObject = await prisma.car.create({
    data: {
      name: car,
    },
  })

  console.log("__car: ", carObject)

  return redirect("/car")
}

export default function Index() {
  const data = useLoaderData<LoaderData>()

  console.log(data)

  console.log("__data: ", data)

  return (
    <>
      <Form method="post">
        <label>Car </label>
        <input name="car" type="text" />
        <button className="bg-red-600 m-2 p-2  ">Add new car</button>
      </Form>

      {data.car.map((item, index) => (
        <div key={index}>{item.name}</div>
      ))}
    </>
  )
}
