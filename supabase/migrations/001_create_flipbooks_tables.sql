-- Create flipbooks table
CREATE TABLE flipbooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  grade INTEGER NOT NULL,
  subject_slug VARCHAR(100) NOT NULL,
  total_pages INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create flipbook_pages table
CREATE TABLE flipbook_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flipbook_id UUID REFERENCES flipbooks(id) ON DELETE CASCADE NOT NULL,
  page_number INTEGER NOT NULL,
  image_url VARCHAR(512) NOT NULL,
  ocr_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(flipbook_id, page_number)
);

-- Create flipbook_hotspots table
CREATE TABLE flipbook_hotspots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flipbook_id UUID REFERENCES flipbooks(id) ON DELETE CASCADE NOT NULL,
  page_number INTEGER NOT NULL,
  hotspot_id VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  bbox JSONB NOT NULL,
  label TEXT,
  correct_answer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX idx_flipbooks_slug ON flipbooks(slug);
CREATE INDEX idx_flipbooks_subject_grade ON flipbooks(subject_slug, grade);
CREATE INDEX idx_flipbook_pages_flipbook_id ON flipbook_pages(flipbook_id);
CREATE INDEX idx_flipbook_pages_number ON flipbook_pages(page_number);
CREATE INDEX idx_flipbook_hotspots_flipbook_id ON flipbook_hotspots(flipbook_id);
CREATE INDEX idx_flipbook_hotspots_page ON flipbook_hotspots(flipbook_id, page_number);

-- Insert initial data for KHTN 7 SBT
INSERT INTO flipbooks (slug, title, grade, subject_slug, total_pages)
VALUES ('khtn-7-sbt', 'SBT Khoa học tự nhiên 7', 7, 'khtn', 147)
ON CONFLICT (slug) DO NOTHING;
