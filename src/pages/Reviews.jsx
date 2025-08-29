import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
  TextField,
  Tooltip,
} from "@mui/material";

const reviews = [
  {
    name: "Michael B. Coch",
    role: "Kaika Hill, CEO / Hill & CO",
    text: "I recently purchased a t-shirt that really appreciate about it. Firstly, the material is absolutely wonderful. It feels soft, breathable, and of high quality. The stitching is neat, and the design is trendy yet comfortable. Definitely worth the price!",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    product: "T-Shirt",
    date: "21 December 2023",
    location: "U.S.A",
    rating: 4.5,
    quality: "Excellent Quality",
  },
  {
    name: "Theresa T. Brose",
    role: "Millenia Life / General Internist",
    text: "I purchased a pair of jeans. Firstly, the fabric is fantastic and comfortable to wear all day.",
    product: "Pair of Jeans",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "10 January 2024",
    location: "Canada",
    rating: 5,
    quality: "Top Quality",
  },
  {
    name: "James L. Erickson",
    role: "Omni Tech Solutions / Founder",
    text: "The fit is perfect, hugging in all the right places while still being breathable.",
    product: "Running Shoes",
    img: "https://randomuser.me/api/portraits/men/76.jpg",
    date: "3 February 2024",
    location: "Australia",
    rating: 4,
    quality: "Good Quality",
  },
  {
    name: "Lily W. Wilson",
    role: "Grade A Investment / Manager",
    text: "The dress exceeded my expectations and quickly became a favorite in my wardrobe.",
    product: "Summer Dress",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    date: "5 March 2024",
    location: "India",
    rating: 5,
    quality: "Premium Quality",
  },
];

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReviews = useMemo(() => {
    if (!searchTerm) {
      return reviews;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return reviews.filter(review => {
      return (
        review.text.toLowerCase().includes(lowerCaseSearchTerm) ||
        review.product.toLowerCase().includes(lowerCaseSearchTerm));
    });
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (

    <Box sx={{ p: { xs: 2, md: 3 }, minHeight: "100vh",mt:5 }}>
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        sx={{ mb: 4, color: "#1e3a8a", textAlign: "center" }}
      >
        Customer Reviews
      </Typography>

      {/* Search Input */}
      <Box sx={{ mb: 4, maxWidth: 400, mx: "auto" }}>
        <TextField
          fullWidth
          label="Search Reviews"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>
      {/* Responsive Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
          },
          gap: 3,
        }}
      >
        {filteredReviews.map((r, i) => (
          <Card
            key={i}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              transition: "all 0.3s ease",
              "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
            }}
          >
            {/* Top Section */}
            <CardContent sx={{ pb: 6 }}>
              {/* Location + Date (truncate) */}
              <Box mb={1}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#1e40af" }}>
                  Reviewed in {r.location}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#1e40af" }}>
                  on {r.date}
                </Typography>
              </Box>


              {/* Description with ellipsis */}
              <Tooltip title={r.text}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 2,
                    color: "#334155",
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3, // show only 3 lines
                  }}
                >
                  "{r.text}"
                </Typography>
              </Tooltip>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating value={r.rating} precision={0.5} readOnly size="small" />
                <Typography variant="body2" fontWeight="500" color="#1d4ed8">
                  {r.quality}
                </Typography>
              </Box>
            </CardContent>

            {/* Footer Section (Blue Gradient) */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #3b82f6, #1e40af)",
                color: "white",
                position: "relative",
                textAlign: "center",
                p: 3,
              }}
            >
              {/* Avatar */}
              <Avatar
                src={r.img}
                alt={r.name}
                sx={{
                  width: 70,
                  height: 70,
                  position: "absolute",
                  top: -35,
                  left: "50%",
                  transform: "translateX(-50%)",
                  border: "3px solid white",
                  boxShadow: 2,
                }}
              />

              {/* Name */}
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ mt: 4, mb: 0.5 }}
              >
                {r.name}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Reviews;
