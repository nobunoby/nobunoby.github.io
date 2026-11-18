---
layout: page
permalink: /publications/
title: publications
description: Journal articles, conference papers, and preprints.
nav: true
nav_order: 2
---

The list below includes peer-reviewed publications and preprints; a preprint is not presented as a peer-reviewed conference or journal paper until that status is verified.

<link rel="stylesheet" href="{{ '/assets/css/publications-custom.css' | relative_url }}">

{% include bib_search.liquid %}

<section class="publication-keyword-filter" aria-label="Filter publications by research area" hidden>
  <strong>Filter by research area</strong>
  <div class="publication-filter-tags" role="group" aria-label="Research areas"></div>
  <div class="publication-filter-options">
    <fieldset>
      <legend>Match</legend>
      <label><input type="radio" name="keyword-mode" value="any" checked> Any selected (OR)</label>
      <label><input type="radio" name="keyword-mode" value="all"> All selected (AND)</label>
    </fieldset>
    <button type="button" class="publication-filter-clear">Clear all</button>
  </div>
  <p class="publication-filter-count" role="status" aria-live="polite"></p>
  <p class="publication-filter-empty" hidden>No publications match the selected filters.</p>
</section>

{% capture keyword_entries %}{% bibliography --group_by none --template '{{key}}|{{entry.keywords}}' %}{% endcapture %}
<template id="publication-keyword-data">{{ keyword_entries }}</template>
<script src="{{ '/assets/js/publication-keywords.js' | relative_url | bust_file_cache }}" defer></script>

<div class="publications">
{% bibliography %}
</div>
