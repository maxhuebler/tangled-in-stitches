import React from "react"
import renderer from "react-test-renderer"
import Navigation from ".."

describe("Tests for Navigation component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Navigation siteTitle="Tangled in Stitches" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
