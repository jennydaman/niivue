import { test, expect } from '@playwright/test'
import { httpServerAddress } from './helpers'

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto(httpServerAddress)
  console.log(`Running ${testInfo.title}`)
})

test('niivue draw 3D clipPlane correct in axial plane', async ({page}) => {
  await page.evaluate(async () => {
    let opts = {
      textHeight: 0.05, // larger text
      crosshairColor: [0, 0, 1, 1] // green
    }
    const nv = new Niivue((opts = opts))
    await nv.attachTo('gl', false)
    nv.setSliceType(nv.sliceTypeRender)
    nv.setClipPlane([0, 0, -90])

    // load one volume object in an array
    const volumeList = [
      {
        url: './images/mni152.nii.gz', // "./RAS.nii.gz", "./spm152.nii.gz",
        volume: { hdr: null, img: null },
        name: 'mni152.nii.gz',
        colormap: 'gray',
        opacity: 1,
        visible: true
      }
    ]
    await nv.loadVolumes(volumeList)
  })
  // take a snapshot for comparison
  await expect(page.locator('#gl')).toHaveScreenshot({ timeout: 30000 })
})

test('niivue draw 3D clipPlane correct in coronal plane', async ({page}) => {
  await page.evaluate(async () => {
    let opts = {
      textHeight: 0.05, // larger text
      crosshairColor: [0, 0, 1, 1] // green
    }
    const nv = new Niivue((opts = opts))
    await nv.attachTo('gl', false)
    nv.setSliceType(nv.sliceTypeRender)
    nv.setClipPlane([0, 0, 0])

    // load one volume object in an array
    const volumeList = [
      {
        url: './images/mni152.nii.gz', // "./RAS.nii.gz", "./spm152.nii.gz",
        volume: { hdr: null, img: null },
        name: 'mni152.nii.gz',
        colormap: 'gray',
        opacity: 1,
        visible: true
      }
    ]
    await nv.loadVolumes(volumeList)
  })
  // take a snapshot for comparison
  await expect(page.locator('#gl')).toHaveScreenshot({ timeout: 30000 })
})

test('niivue draw 3D clipPlane correct in sagittal plane', async ({page}) => {
  await page.evaluate(async () => {
    let opts = {
      textHeight: 0.05, // larger text
      crosshairColor: [0, 0, 1, 1] // green
    }
    const nv = new Niivue((opts = opts))
    await nv.attachTo('gl', false)
    nv.setSliceType(nv.sliceTypeRender)
    nv.setClipPlane([0, 270, 0])

    // load one volume object in an array
    const volumeList = [
      {
        url: './images/mni152.nii.gz', // "./RAS.nii.gz", "./spm152.nii.gz",
        volume: { hdr: null, img: null },
        name: 'mni152.nii.gz',
        colormap: 'gray',
        opacity: 1,
        visible: true
      }
    ]
    await nv.loadVolumes(volumeList)
  })
  // take a snapshot for comparison
  await expect(page.locator('#gl')).toHaveScreenshot({ timeout: 30000 })
})
