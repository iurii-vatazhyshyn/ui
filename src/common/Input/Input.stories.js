import React from 'react'

import Input from './Input'

export default {
  title: 'Example/Input',
  component: Input
}

const commonArgs = {
  floatingLabel: true
}

const Template = args => <Input {...args} />

export const Dense = Template.bind({})
Dense.args = {
  ...commonArgs,
  density: 'dense',
  label: 'Dense'
}

export const Normal = Template.bind({})
Normal.args = {
  ...commonArgs,
  density: 'normal',
  label: 'Normal'
}

export const Medium = Template.bind({})
Medium.args = {
  ...commonArgs,
  density: 'medium',
  label: 'Medium'
}

export const Chunky = Template.bind({})
Chunky.args = {
  ...commonArgs,
  density: 'chunky',
  label: 'Chunky'
}

export const DenseMandatory = Template.bind({})
DenseMandatory.args = {
  ...commonArgs,
  density: 'dense',
  label: 'Mandatory',
  mandatory: true
}

export const NormalMandatory = Template.bind({})
NormalMandatory.args = {
  ...commonArgs,
  density: 'normal',
  label: 'Mandatory',
  mandatory: true
}

export const MediumMandatory = Template.bind({})
MediumMandatory.args = {
  ...commonArgs,
  density: 'medium',
  label: 'Mandatory',
  mandatory: true
}

export const ChunkyMandatory = Template.bind({})
ChunkyMandatory.args = {
  ...commonArgs,
  density: 'chunky',
  label: 'Mandatory',
  mandatory: true
}
