import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { categories } from "../constant/categories";
import { useAuth } from "../contexts/AuthContext";
import { useProducts } from "../contexts/ProductContext";

const AddProduct: React.FC = () => {
  const { user } = useAuth();
  const { fetchProducts } = useProducts();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select an image before submitting");

    setLoading(true);
    try {
      const filePath = `products/${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage
        .from("product-images")
        .getPublicUrl(uploadData.path);

      const imageUrl = publicData.publicUrl;

      const { error: insertError } = await supabase.from("products").insert([
        {
          title,
          description,
          price: parseFloat(price),
          category,
          condition,
          image_url: imageUrl,
          is_sold: false,
          user_id: user?.id, // ✅ save user_id
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);

      if (insertError) throw insertError;

      alert("✅ Product added successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setCondition("");
      setFile(null);

      fetchProducts(); // ✅ refresh product list
    } catch (err: any) {
      console.error("Error:", err.message);
      alert("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <Input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />

            <Select onValueChange={(val) => setCategory(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input type="text" placeholder="Condition" value={condition} onChange={(e) => setCondition(e.target.value)} required />
            <Input type="file" accept="image/*" onChange={handleFileChange} />

            <Button type="submit" disabled={loading} className="w-full">{loading ? "Uploading..." : "Add Product"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
