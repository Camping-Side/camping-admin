import { useFormContext } from "react-hook-form";
import { Box, Button, Grid, ImageList, ImageListItem } from "@mui/material";
import { ImgHTMLAttributes } from "react";

const ImageBox = (props: ImgHTMLAttributes<HTMLImageElement>) => (
  <Box
    component="img"
    sx={{
      width: 100,
      height: 100,
      display: "block"
    }}
    loading="lazy"
    {...props}
  />
);

export const ImageGrid = () => {
  const { register, watch } = useFormContext();
  const majorImage: FileList = watch("majorImage");
  const minorImages: FileList = watch("minorImages");
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{fontWeight: 'bold'}}>상품이미지</Grid>
      <Grid item xs={2}>
        대표이미지
      </Grid>
      <Grid item xs={10}>
        <Button
          variant="outlined"
          component="label"
        >
          Upload File
          <input
            type="file"
            accept="image/*"
            {...register("majorImage")}
            hidden
          />
        </Button>
        {
          majorImage && majorImage.length > 0 && <ImageBox
            src={URL.createObjectURL(majorImage[0])}
          />
        }
      </Grid>
      <Grid item xs={2}>
        추가이미지
      </Grid>
      <Grid item xs={10}>
        <Button
          variant="outlined"
          component="label"
        >
          Upload File
          <input
            type="file"
            accept="image/*"
            {...register("minorImages")}
            multiple
            hidden
          />
        </Button>
        {
          minorImages && minorImages.length > 0 && <ImageList sx={{ width: 500, height: 200 }} cols={3} rowHeight={164}>
            {Array.from(minorImages).map((minorImage, idx) => (
              <ImageListItem key={idx}>
                <ImageBox
                  src={URL.createObjectURL(minorImage)}
                />
              </ImageListItem>
            ))}
          </ImageList>
        }
      </Grid>
    </Grid>
  );
};