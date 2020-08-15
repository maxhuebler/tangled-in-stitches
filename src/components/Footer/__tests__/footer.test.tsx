import React from "react"
import renderer from "react-test-renderer"

import Footer from ".."

describe("Tests for Footer component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Footer siteTitle={"Tangled in Stitches"} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
