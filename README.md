# h5view

A HDF5 preview frontend that provides an interface for users to browse HDF5 files.

## Prerequisites

- `yarn`
- `node`

## How it works

This frontend uses the preview UI component provided by `@h5web/app`.

It first requests the file to be downloaded on the server side by making a `POST /request` request to [h5view](https://github.com/kennethnym/h5view).
It then polls the progress of the request every 3 seconds to see if the download is complete.  Once it is complete, the frontend then switches to the preview UI.

## Running the frontend

1.`yarn`
2. `yarn dev`
