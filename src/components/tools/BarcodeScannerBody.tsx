"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ScanBarcode, Search } from "lucide-react";

export function BarcodeScannerBody() {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async () => {
    if (!barcode) return;
    setLoading(true);
    setError("");
    setProduct(null);

    try {
      const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      if (!res.ok) throw new Error("Failed to fetch product data");
      const json = await res.json();
      
      if (json.status === 0) {
        setError("Product not found in Open Food Facts database.");
      } else {
        setProduct(json.product);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex justify-center items-center gap-2">
              <ScanBarcode className="w-6 h-6 text-green-600" />
              Barcode Food Scanner
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Lookup any food product barcode to instantly see nutrition facts & ingredients.
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={barcode}
              onChange={e => setBarcode(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter barcode (e.g. 737628064502)"
              className="flex-1 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              onKeyDown={e => e.key === "Enter" && search()}
            />
            <button
              onClick={search}
              disabled={loading}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Search className="w-5 h-5" />
              {loading ? "Searching..." : "Lookup"}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-center">
              {error}
            </div>
          )}

          {product && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {product.image_url && (
                  <img src={product.image_url} alt="Product" className="w-32 h-32 object-contain bg-white rounded-lg border border-slate-200" />
                )}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{product.product_name || "Unknown Product"}</h3>
                  <div className="text-slate-500 mt-1">{product.brands ? `Brand: ${product.brands}` : ""}</div>
                  {product.quantity && <div className="text-slate-500">Size: {product.quantity}</div>}
                  {product.ecoscore_grade && (
                    <div className="mt-2 inline-flex px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold rounded-lg uppercase text-sm">
                      Eco-Score: {product.ecoscore_grade}
                    </div>
                  )}
                </div>
              </div>

              {product.nutriments && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-center border border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-slate-500 uppercase font-bold">Energy / 100g</div>
                    <div className="text-xl font-black text-slate-900 dark:text-white">{product.nutriments["energy-kcal_100g"] || 0} kcal</div>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-center border border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-slate-500 uppercase font-bold">Fat / 100g</div>
                    <div className="text-xl font-black text-slate-900 dark:text-white">{product.nutriments["fat_100g"] || 0} g</div>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-center border border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-slate-500 uppercase font-bold">Carbs / 100g</div>
                    <div className="text-xl font-black text-slate-900 dark:text-white">{product.nutriments["carbohydrates_100g"] || 0} g</div>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-center border border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-slate-500 uppercase font-bold">Protein / 100g</div>
                    <div className="text-xl font-black text-slate-900 dark:text-white">{product.nutriments["proteins_100g"] || 0} g</div>
                  </div>
                </div>
              )}

              {product.ingredients_text && (
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Ingredients</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    {product.ingredients_text}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
