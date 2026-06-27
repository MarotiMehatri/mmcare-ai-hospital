export function mergeAIResultsWithProviders(aiData, providers) {
  const aiResults = Array.isArray(aiData?.results) ? aiData.results : [];

  const mergedResults = providers.map((provider) => {
    const aiMatch = aiResults.find(
      (item) => Number(item.id) === Number(provider.id),
    );

    return {
      ...provider,
      aiReason: aiMatch?.aiReason || "Relevant nearby healthcare option.",
    };
  });

  let sortedResults = [...mergedResults];

  if (aiResults.length > 0) {
    sortedResults = aiResults
      .map((aiItem) => {
        const provider = mergedResults.find(
          (item) => Number(item.id) === Number(aiItem.id),
        );
        return provider || null;
      })
      .filter(Boolean);
  }

  return {
    querySummary: aiData?.querySummary || "Nearby healthcare services found.",
    topRecommendation: aiData?.topRecommendation || {
      name: sortedResults[0]?.name || "No recommendation",
      reason: "Best available nearby option.",
    },
    results: sortedResults,
  };
}
