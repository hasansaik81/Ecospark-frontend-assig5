"use server";



// export const getAllIdea = async () => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/ideas/`,
      
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
          
//         },
//         next: {
//           revalidate: 3600,
//         },
//       },
//     );
//     const result = await res.json();

//     return result;
//   } catch (error: any) {
//     return Error(error);
//   }
// };


export const getAllIdea = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/ideas/public`;

    console.log("Fetching:", url);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await res.json();

    console.log("API RESULT:", result);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getPublicSingleCategory= async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category/public/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          
        },
        next: {
          revalidate: 3600,
        },
      },
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};


