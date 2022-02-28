import { DocumentNode } from "@apollo/client";
import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "./auth";
import { propertyApi } from "common/config/graphql";
import { toast } from "react-toastify";

export const getErrorMessage = (error: any): string => {
  let errorMessage = error?.networkError?.result?.errors?.[0]?.message;
  if (!errorMessage) {
    errorMessage = error?.message;
  }
  return errorMessage;
};

const printErrorOfGraphQLFromServer = (error: any, query?: any) => {
  console.log(
    `%c ⚠️ [GraphQL Error] ${query?.definitions[0]?.selectionSet?.selections[0]?.name?.value}`,
    "color: #d4395b; font-weight: 700; ; font-size: 13px;",
  );
  console.log(
    "%c " +
      getErrorMessage(error)
        ?.split(";")
        .join("\n------ ***\n")
        .replace(/\{[\s\S].*\}/g, contents => "\n" + contents),
    "color: #d4395b",
  );
};
console.log({
  Authorization: `Bearer ${getToken()}`,
});

const graphQLCommon = async (query: DocumentNode, variables: any) => {
  try {
    const response = await propertyApi.query({
      query,
      variables,
      context: {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    });
    const { errors = [] } = response;
    if (errors.length > 0) {
      console.error(errors);
      printErrorOfGraphQLFromServer(errors[0], query);
      console.log("DEBUG: ", { variables, response });

      const { message = "" } = errors[0] || {};
      toast.error(message);
    }
    return response;
  } catch (error: any) {
    console.error(error);
    printErrorOfGraphQLFromServer(error, query);
    console.log("DEBUG: ", { variables });
    toast.error(error.message);
    return error;
  }
};

const axiosJSON = (options: AxiosRequestConfig) => {
  return axios(options)
    .then(res => res)
    .catch(error => error);
};

export { graphQLCommon, axiosJSON };
