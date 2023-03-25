export type BreadCrumb = {
    href: string,
    text: string,
    // TODO: maybe there is a type getter for
    //  another type call result,
    //  for example $Call<GetTextGenerator>,
    //  however it can be unnecessary
    textGenerator: null | Promise<string>
};
