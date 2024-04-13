module PerformancesHelper
  def formatted_date(created_at)
    if created_at < 1.week.ago
      created_at.strftime("%b %d, %Y")
    else
      time_ago_in_words(created_at) + " ago"
    end
  end
end
